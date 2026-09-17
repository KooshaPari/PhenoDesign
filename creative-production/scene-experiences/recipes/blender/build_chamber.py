"""Original native-authoring recipe; execute on a qualified Blender host.
Example: blender --background --factory-startup --python build_chamber.py -- --out /owned/new/lumen
Not executed in the preparation environment. No third-party assets or fonts.
"""
import argparse, json, math, sys
from pathlib import Path
import bpy
from mathutils import Vector

def args():
    tail=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
    p=argparse.ArgumentParser();p.add_argument('--out',required=True);p.add_argument('--aperture',type=float,default=.62)
    return p.parse_args(tail)

def mat(name,color,metallic=0,roughness=.4,emission=0):
    m=bpy.data.materials.new(name);m.use_nodes=True
    b=m.node_tree.nodes.get('Principled BSDF');b.inputs['Base Color'].default_value=(*color,1)
    b.inputs['Metallic'].default_value=metallic;b.inputs['Roughness'].default_value=roughness
    if emission:
        # Socket names differ across Blender releases: fail clearly if this path is unavailable.
        if 'Emission Color' not in b.inputs:raise RuntimeError('Qualify this material recipe on the installed Blender version')
        b.inputs['Emission Color'].default_value=(*color,1);b.inputs['Emission Strength'].default_value=emission
    return m

def cylinder(name,radius,depth,z,material):
    bpy.ops.mesh.primitive_cylinder_add(vertices=96,radius=radius,depth=depth,location=(0,0,z))
    o=bpy.context.object;o.name=name;o.data.materials.append(material)
    bevel=o.modifiers.new('Machined edge','BEVEL');bevel.width=.018;bevel.segments=3
    o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');return o

def ring(name,outer,inner,depth,z,material):
    vs=[];faces=[];n=96
    for zz in (z-depth/2,z+depth/2):
        for rr in (outer,inner):
            vs.extend((rr*math.cos(i*2*math.pi/n),rr*math.sin(i*2*math.pi/n),zz) for i in range(n))
    for i in range(n):
        j=(i+1)%n
        faces.extend([(i,j,2*n+j,2*n+i),(n+j,n+i,3*n+i,3*n+j),(2*n+i,2*n+j,3*n+j,3*n+i),(j,i,n+i,n+j)])
    mesh=bpy.data.meshes.new(name+'Mesh');mesh.from_pydata(vs,[],faces);mesh.update()
    obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj);obj.data.materials.append(material)
    bevel=obj.modifiers.new('Machined edge','BEVEL');bevel.width=.012;bevel.segments=3
    obj.modifiers.new('Weighted normals','WEIGHTED_NORMAL');return obj

def aim(obj,target):obj.rotation_euler=(Vector(target)-obj.location).to_track_quat('-Z','Y').to_euler()
def main():
    a=args()
    if not math.isfinite(a.aperture) or not 0<=a.aperture<=1:raise ValueError('Aperture must be finite in [0,1]')
    out=Path(a.out).expanduser().resolve()
    if out.exists() and any(out.iterdir()):raise FileExistsError('Use an owned empty output directory')
    out.mkdir(parents=True,exist_ok=True)
    # factory-startup is required; operate only on this owned background process, not a user document.
    bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
    steel=mat('Silver machined housing',(.46,.53,.55),.88,.24)
    dark=mat('Graphite iris',(.027,.05,.063),.7,.35)
    light=mat('Emitter teal',(.36,.74,.65),.1,.3,2.2)
    floor=mat('Room graphite',(.023,.038,.049),.12,.53)
    ring('Shell',1.0,.77,.23,0,steel)
    iris=ring('Iris',.76,.19+.29*a.aperture,.045,.16,dark)
    emitter=cylinder('Emitter',.72,.035,-.18,light)
    # Editable exploded-view transforms at explicit keyframes; no implicit simulation.
    iris.keyframe_insert(data_path='location',frame=1);iris.location.z=.9;iris.keyframe_insert(data_path='location',frame=100)
    emitter.keyframe_insert(data_path='location',frame=1);emitter.location.z=-.7;emitter.keyframe_insert(data_path='location',frame=100)
    bpy.context.scene.frame_set(1)
    bpy.ops.mesh.primitive_plane_add(size=30,location=(0,-1.25,0),rotation=(math.pi/2,0,0))
    bpy.context.object.name='Ground';bpy.context.object.data.materials.append(floor)
    for name,pos,energy,size in [('Key',(3,4,4),600,5),('Rim',(-3,1,-2),800,3),('Fill',(-2,-1,3),160,3)]:
        data=bpy.data.lights.new(name,'AREA');data.energy=energy;data.shape='DISK';data.size=size
        obj=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(obj);obj.location=pos;aim(obj,(0,0,0))
    camera_data=bpy.data.cameras.new('Experience camera');cam=bpy.data.objects.new('Experience camera',camera_data)
    bpy.context.collection.objects.link(cam);cam.location=(2.3,1.4,4.8);aim(cam,(0,0,0));bpy.context.scene.camera=cam;camera_data.lens=52
    scene=bpy.context.scene;scene.render.resolution_x=1440;scene.render.resolution_y=900;scene.render.resolution_percentage=100
    scene.render.image_settings.file_format='PNG';scene.render.filepath=str(out/'preview.png')
    scene.world.color=(.04,.04,.04)
    bpy.ops.wm.save_as_mainfile(filepath=str(out/'lumen-chamber.blend'))
    # Export only the instrument, not the room/camera/lights, using the installed glTF exporter.
    bpy.ops.object.select_all(action='DESELECT')
    for name in ('Shell','Iris','Emitter'):bpy.data.objects[name].select_set(True)
    bpy.ops.export_scene.gltf(filepath=str(out/'lumen-instrument.glb'),export_format='GLB',use_selection=True)
    bpy.ops.render.render(write_still=True)
    (out/'authoring-receipt.json').write_text(json.dumps({'blender':bpy.app.version_string,'aperture':a.aperture,'objects':['Shell','Iris','Emitter'],'source':'lumen-chamber.blend','export':'lumen-instrument.glb','render':'preview.png','cold_reopen':'NOT_EXECUTED_BY_THIS_SCRIPT','independent_consumer':'NOT_EXECUTED_BY_THIS_SCRIPT'},indent=2))
if __name__=='__main__':main()
