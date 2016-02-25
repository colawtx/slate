#Publishing Applications 

## Overview

### Publishing Your Application
If you don't have an app to publish yet please go to the step "Agent/Job apps setup"

**Setup Your Workspace**

> npm install -g bodhi-cli* (sudo npm install -g bodhi-cli) 

* Initialize your bodhi-cli workspace.
> mkdir [workspace]
> cd [workspace]

* Use this command to create a new environment ::
> bodhi init

* This will create a rbc-project.json which will store all your environment info. It will also create an /apps directory where you can add your app for publication.

### Agent/Job apps setup ###
List of things we need to have in the folder to be able to submit app to the Bodhi Shop::

* Folder (npm app-name)
* index.html (could be empty)
* LICENSE
* package.json (example provided below) 
* public (folder) (If no new types are created, skip this step)
*  - NewType1.json file
*  - NewType2.json file
*  - NewType3.json file
*  - app icon.png
* www (this folder have all the files above copied to this folder)

Example of Package.json :: 

```
#!javascript

{
  "name": "app-package-name",
  "version": "0.0.1",
  "title": "Application Title",
  "description": "Short Application Description.",
  "profile": {
    "name": "app-package-name",
    "dml": {
      “BodhiApplication": {
       "select": {},
       "update":{},
       "delete":{},
       "insert":{}
      },
      "NewType1": {
        "select": {}
      },
      "NewType2": {
        "select": {}
      }
    }
  },
  "settings": {
    "categories": [
      "Aloha",
      "POS"
    ],
    "publisher": "HotSchedules",
    "npm_package_name": "app-package-name",
    

if you have any related apps you want to install together::
"related-apps": [
      "bodhi.aloha-app-transactions",
      "bodhi.aloha-app-store"
    ],
    "public_path": "public",
    "global_store_icon": "public/icon.png",
   "type": "agent",    
(type can be “job”, “agent”, “mobile”, “web” )   
 "new_type_required": true,
  "install": {
"new": {
"model": [
{
"type": "enumeration",
"name": "TypeName",
"object": "Enumerations/TypeName.json"
},
{
"type": "embedded_type",
"name": "InventoryPurchaseOrder",
"object": "Types/InventoryPurchaseOrder.json"
},
{ "type": "custom_type",
"name": "TypeName2",
"object": "Types/TypeName2.json"
}
],
"post-type-install": [
{"action": "POST",
"object": "Data/DataFile.json",
"path": "/resources/DataFile"
}
]
if you have any parameters required to be used with the app we add this section:: 
 "agent_parameters": {
      "interval": {
        "description": "How often to execute a grind",
        "required": true,
        "type": "string",
        "default": "every 15 minutes",
        "position": 1
      }
    }
  },
  "autoUpdateVersion": false
}

```

### Generic package.json flags## 

**offline=true/false**  

Offline controls whether the container will cache application information for offline use. If offline=true and the user launches the application, any data that was previously loaded will be available when the device is offline. This will also enable queuing of data to write to the Bodhi Cloud if the app has write permissions.

**single_container_app=true/false**  

single_container_app the container know whether the app should be displayed with a menu (a collection of apps) or as a standalone single app.
Bodhi Mobile has single_container_app = false. Bodhi Reveal has single_container_app = true

**hide_from_global_store=true/false**  

hide_from_global_store controls whether the app is available to the general public to see in the global app store. Apps like Settings which cannot be removed should have hide_from_global_store=true

**new_type_required=true/false**  

new_type_required tells the installer of the app in the global app store if the app will run 'out of the box' or if new custom types need to be installed on the namespace.
NOTE:: if new_type_required=true, troubleshooting_url should be required

**categories {}**  

The categories array allows you to give the Bodhi app store taxonomical information about how your app relates to other applications. 
Examples include financial, inventory, mangagement

**public_path'/xxx/xxx'** 

The Public Path is a location off of root that allows developers to save items that should be publically visable and available. The Public Path folder should contain screenshots and Icons that the global app store can use. The global_store_icon as well as the screenshots settings objects should all be relative paths to the public path.

**global_store_icon='/xxx/xxx.png'**  

The global_store_icon is the icon that the Global App Store will use for display purposes. This file should be included in the app folder that is published via app tools and the path should be relative to the public_path.

**screenshots{}** 

The screenshots array contains relative paths to screenshots which the Global App Store will use for display purposes. This files should be included in the app folder that is published via app tools and the path should be relative to the public_path.

**agent/job_parameters:{}** and **agent/job_parameters_hidden:{}**

The agent/job_parameters contain information about any parameters that the agent or job requires to run.  They contain data_dir formatted information containing description, a required flag, type string and an optional position which is set will position the parameter in the order set 0, 1, 2, etc if not set then the parameter will be displayed in the order it's defined. Application parameters will be saved under settings so the application should use parameters from settings.

NOTE: The hidden parameter option will not be visible to the user in the installation process but will be written under the application settings.

**data_dir:{}**

The data_dir formatted information contains a description, a required flag, type string and an optional position which is set will position the parameter in the order set 0, 1, 2, etc if not set then the parameter will be displayed in the order it's defined.

**autoUpdateVersion": false**

This flag prevents autoUpdate version of the app each time you are publishing it
