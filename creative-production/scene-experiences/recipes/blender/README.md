# On-device spatial source

Run only in a qualified owned background Blender process and an empty owned output directory.
The script is an original simplified optical-instrument authoring recipe, not a measured device
or a photoreal final asset. It does not grant access to operator sessions or files.

After authoring, launch a separate cold process to reopen the `.blend`, verify named meshes,
materials, camera and linked data, then export again and inspect GLB/render output in the real
consumer. The script's receipt explicitly does not certify those later steps. Qualify the installed
Blender version, renderer and glTF export API. Do not assume emitted light produces the same
appearance in a web renderer; author the web lighting/bake deliberately.
