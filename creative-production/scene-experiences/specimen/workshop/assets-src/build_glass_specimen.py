# Build script for the Workshop "glass specimen" hero asset.
# Run headlessly:
#   blender --background --python assets-src/build_glass_specimen.py
#
# Produces:
#   assets-src/glass-specimen.blend   (editable source)
#   public/assets/glass-specimen.glb  (glTF 2.0 export, KHR_materials_transmission)

import bpy
import os
import sys

# Resolve the assets-src directory (script may be run from anywhere).
SRC_DIR = os.path.dirname(os.path.abspath(__file__))
BLEND_PATH = os.path.join(SRC_DIR, "glass-specimen.blend")

# public/assets lives next to assets-src, inside the workshop root.
WORKSHOP_ROOT = os.path.dirname(SRC_DIR)
GLB_DIR = os.path.join(WORKSHOP_ROOT, "public", "assets")
GLB_PATH = os.path.join(GLB_DIR, "glass-specimen.glb")

# --- Scene reset -----------------------------------------------------------

bpy.ops.wm.read_factory_settings(use_empty=True)

COLLECTION_NAME = "WorkshopSpecimens"
collection = bpy.data.collections.new(COLLECTION_NAME)
bpy.context.scene.collection.children.link(collection)

# --- Materials -------------------------------------------------------------


def make_material(name, base_color):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf is None:
        # Fallback: find any principled node (socket names can shift between
        # Blender versions).
        for n in mat.node_tree.nodes:
            if n.type == "BSDF_PRINCIPLED":
                bsdf = n
                break
    return mat, bsdf


# GlassBody: pale cyan, fully transmissive, near-mirror smooth.
mat_glass, glass_bsdf = make_material("GlassBody", (0.494, 0.722, 0.855, 1.0))
S = glass_bsdf.inputs
S["Base Color"].default_value = (0.494, 0.722, 0.855, 1.0)
S["Roughness"].default_value = 0.03
S["Alpha"].default_value = 1.0
# Blender >= 4.0 exposes Transmission Weight; older used Transmission.
if "Transmission Weight" in S:
    S["Transmission Weight"].default_value = 1.0
else:
    S["Transmission"].default_value = 1.0
S["IOR"].default_value = 1.45

# CoreGlow: violet emissive core, mostly metallic.
mat_core, core_bsdf = make_material("CoreGlow", (0.655, 0.545, 0.980, 1.0))
C = core_bsdf.inputs
C["Base Color"].default_value = (0.655, 0.545, 0.980, 1.0)
C["Emission Color"].default_value = (0.655, 0.545, 0.980, 1.0)
C["Emission Strength"].default_value = 2.0
C["Metallic"].default_value = 0.8
C["Roughness"].default_value = 0.2

# --- Helper: link object into the collection --------------------------------


def link(obj):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    collection.objects.link(obj)
    return obj


# --- Outer body: cut-gem profile (table / crown / girdle / pavilion) --------
#
# Built as a lofted prism from a gem cross-section profile: an octagonal
# table ring up top, wider octagonal crown + girdle rings below, tapering
# through pavilion steps to a point. This reads as a precision cut-gem
# rather than a raw icosahedron, and stays clean quad topology.

import bmesh
from mathutils import Vector


def gem_profile_rings(segments=8):
    """Return (radius, z, scale_xy) rings from table down to pavilion tip."""
    rings = [
        # (z height, xy radius, radial scale for facet variety)
        (0.62, 0.155, 1.000),  # table (flat top, narrow)
        (0.44, 0.240, 1.000),  # crown upper
        (0.26, 0.290, 1.000),  # crown mid
        (0.00, 0.300, 1.000),  # girdle (widest)
        (-0.14, 0.225, 1.000),  # pavilion upper
        (-0.28, 0.130, 1.000),  # pavilion mid step
        (-0.42, 0.000, 1.000),  # culet point
    ]
    return rings


def build_gem_body():
    mesh = bpy.data.meshes.new("GlassBody")
    obj = bpy.data.objects.new("GlassBody", mesh)
    bm = bmesh.new()

    segments = 8
    rings = gem_profile_rings()

    verts_per_ring = []
    for z, r, _s in rings:
        if r <= 0.0001:
            # culet point
            v = bm.verts.new((0.0, 0.0, z))
            verts_per_ring.append([v])
            continue
        ring = []
        for i in range(segments):
            a = (i / segments) * 2.0 * 3.14159265358979
            ring.append(bm.verts.new((r * __import__("math").cos(a),
                                      r * __import__("math").sin(a),
                                      z)))
        verts_per_ring.append(ring)

    bm.verts.ensure_lookup_table()

    # Bridge consecutive rings with quads (cap last ring is a point so it
    # becomes triangles naturally via ngon from point ring).
    for ri in range(len(verts_per_ring) - 1):
        upper = verts_per_ring[ri]
        lower = verts_per_ring[ri + 1]
        if len(lower) == 1:
            # fan down to the culet point
            culet = lower[0]
            for i in range(len(upper)):
                f = bm.faces.new([upper[i], upper[(i + 1) % len(upper)],
                                  culet])
            continue
        for i in range(len(upper)):
            j = (i + 1) % len(upper)
            bm.faces.new([upper[i], upper[j], lower[j], lower[i]])

    # Cap the table (top ring) flat.
    table = verts_per_ring[0]
    bm.faces.new(table[::-1])  # reversed so normal points +Z

    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])

    # Bevel all edges slightly so highlights catch on the facet junctions.
    bmesh.ops.bevel(
        bm,
        geom=list(bm.verts) + list(bm.edges) + list(bm.faces),
        offset=0.009,
        offset_type="OFFSET",
        segments=3,
        profile=0.5,
        affect="EDGES",
        clamp_overlap=True,
    )

    bm.to_mesh(mesh)
    bm.free()

    # Smooth shade + auto-smooth so facet planes stay flat, bevels read smooth.
    for p in mesh.polygons:
        p.use_smooth = True
    if hasattr(mesh, "use_auto_smooth"):
        mesh.use_auto_smooth = True
        mesh.auto_smooth_angle = 0.523599  # 30 degrees

    obj.data.materials.append(mat_glass)
    link(obj)
    return obj


body = build_gem_body()

# --- Inner core: small octahedron floating inside the glass -----------------


def build_core():
    mesh = bpy.data.meshes.new("core")
    obj = bpy.data.objects.new("core", mesh)
    bm = bmesh.new()
    s = 0.13  # half-extent
    v_top = bm.verts.new((0, 0, s * 1.6))
    v_bot = bm.verts.new((0, 0, -s * 1.6))
    equator = []
    for i in range(4):
        a = (i / 4) * 2.0 * 3.14159265358979
        equator.append(bm.verts.new((s * __import__("math").cos(a),
                                     s * __import__("math").sin(a), 0)))
    bm.verts.ensure_lookup_table()
    for i in range(4):
        j = (i + 1) % 4
        bm.faces.new([equator[i], equator[j], v_top])
        bm.faces.new([equator[j], equator[i], v_bot])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bmesh.ops.bevel(
        bm,
        geom=list(bm.verts) + list(bm.edges) + list(bm.faces),
        offset=0.015,
        offset_type="OFFSET",
        segments=2,
        profile=0.5,
        affect="EDGES",
        clamp_overlap=True,
    )
    bm.to_mesh(mesh)
    bm.free()
    for p in mesh.polygons:
        p.use_smooth = True
    if hasattr(mesh, "use_auto_smooth"):
        mesh.use_auto_smooth = True
        mesh.auto_smooth_angle = 0.698132  # 40 degrees
    obj.data.materials.append(mat_core)
    link(obj)
    return obj


core = build_core()

# --- Origin at object centres, apply transforms -----------------------------

for obj in (body, core):
    # Move mesh data so the object's bounding-box centre sits at the origin.
    bb = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    centre = sum(bb, Vector()) / len(bb)
    obj.data.transform(__import__("mathutils").Matrix.Translation(-centre))
    obj.location = (0.0, 0.0, 0.0)
    obj.scale = (1.0, 1.0, 1.0)
    obj.rotation_euler = (0.0, 0.0, 0.0)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    obj.select_set(False)

# --- Save .blend -------------------------------------------------------------

bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)
print(f"SAVED_BLEND: {BLEND_PATH} ({os.path.getsize(BLEND_PATH)} bytes)")

# --- Export GLB (only the two objects) ---------------------------------------

os.makedirs(GLB_DIR, exist_ok=True)

# Deselect everything, select only our two objects.
for o in bpy.data.objects:
    o.select_set(False)
for name in ("GlassBody", "core"):
    bpy.data.objects[name].select_set(True)
bpy.context.view_layer.objects.active = bpy.data.objects["GlassBody"]

bpy.ops.export_scene.gltf(
    filepath=GLB_PATH,
    export_format="GLB",
    export_apply=True,
    export_materials="EXPORT",
    export_yup=True,
    use_selection=True,
)

print(f"EXPORTED_GLB: {GLB_PATH} ({os.path.getsize(GLB_PATH)} bytes)")
print("DONE")
