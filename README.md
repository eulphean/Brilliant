![image](https://github.com/eulphean/Brilliant/assets/4178424/86c49dc7-dca9-456d-8a4a-5d8d87b04ebf)
## Reflection Study
This interactive is a study of how light reflects in a multi-mirror configuration. 

The hosted link can be found [here](https://ak-brilliant.netlify.app/). 

The hosted [Notion Project](https://wary-socks-1d0.notion.site/Brilliant-Take-Home-3fe2aa2ef2254d5c91fe07cce572593b?pvs=4), which adds additional information about the submission.

### Design Inspiration
The design of this interactive is inspired from [Ray Optics simulator](https://phydemo.app/ray-optics/simulator/) developed by [Yi-Ting Tu](https://github.com/ricktu288/ray-optics). Even though the brief was great, the
physics clicked for me when I could create a mirror configuration, add a light source, and see how the rays are reflected off the mirrors. 

### Components
The interactive consists of 5 core components
1. Source (red dot): This is the light source, which emits rays that are bouncing in the space.
2. Observer (magenta dot): This is the observer, which views the image in the mirror. 
3. Mirrors: These are the two vertical lines acting as mirrors, off of which the light is reflected.
4. Virtual Image (orange dot): These are the images that are created inside the mirror.
5. Observer Image (magenta dot): This overlaps with the virtual image, whenever a light ray intersects with it. This helps keep track of how many images does the oberserver see.

### Environments
There are two environments: Sandbox and Objective. One can move between them by selecting the drop-down button in the Environment GUI

![image](https://github.com/eulphean/Brilliant/assets/4178424/7fd2d828-d575-49b1-9ec8-3c0f58801518)

1. Sandbox: This gives the user an open-ended environment to explore the reflection. It provides a sandbox GUI, which can be used to explore different behaviors of the light.
2. Objective: This environment uses the sandbox to create an objective for the user. For this, only the Source is movable and everything else is static in the scene. For this brief, an objective was laid down for the user, which would help them understand how the light rays are reflected off the mirors and create a virtual image behind the mirror's surface.

### Sandbox GUI

![image](https://github.com/eulphean/Brilliant/assets/4178424/534b6ce0-0ca2-43fa-b78c-93cdcfe27530)

This GUI  gives the user a fine-grain control over the properties of the light rays and the environment. Here's a short description of each property.
1. rayDensity: Controls the number of light rays emitted by the source. The more rays are emitted by the source, the more number of images are created.
2. maxSubrays: Raycasting is a recursive process. This controls the amount of recursive bounces that are allowed. The higher this number, higher is the accuracy and number of images.
3. rayLength: The simnulation shoes rays that are reflected or emanated from the source in white. This controls their length to give higher visibility into all the rays in the scene.
4. sourceRadius: Controls the radius of the source
5. observerRadius: Controls the radius of the observer. This affects the amount of rays the observer can intersect with
6. hideHitRays: Hit rays are the rays that only hit a surface. These are in "green" and can be useful to understand the recursive ray creation.
7. hideRays: These are the rays that are created in the scene. They could or could not be colliding with something else, but aid the user in what rays are created.
