<p align="center">
  <img src="https://avatars.githubusercontent.com/u/74459161?s=400&u=8e4ea6d7a17fad2a655fe5308e3f30a63779085d&v=4" alt="Logo" width="80" height="80">
</p>
<h1 align="center">NTUEE LightDance Editor</h1>

<p align="center">
  <img src="https://img.shields.io/github/v/release/NTUEELightDance/LightDance-Editor?style=flat-square" alt="Release" />
  <img src="https://img.shields.io/github/contributors/NTUEELightDance/LightDance-Editor?style=flat-square" alt="Contributors" />
  <img src="https://img.shields.io/github/license/NTUEELightDance/LightDance-Editor?style=flat-square" alt="License" />
</p>

<p align="center">
  An online editor to design, simulate and control the lights
</p>
<div align="center" >
    <img src="https://user-images.githubusercontent.com/17617373/199907047-a87e1cea-4ff4-45c9-9f41-e05d28a47473.gif" width="100%">
</div>

## Architecture

![image](https://user-images.githubusercontent.com/17617373/151387263-944c1fe0-d6d9-44a9-9c9b-75fc9fee656d.png)

### Services

```
http://localhost:8080 - editor
http://localhost:4000 - editor-server
http://localhost:8081 - file-server
http://localhost:8082 - controller-server
```

## Development

### Docker

You can use Docker to install and start all the services. You can see the editor on `http://localhost:8080`.

```bash
docker-compose -f dev.docker-compose.yml up -d
```

### Local

#### Install the dependencies

This will install all the dependencies in the subfolders.

```bash
yarn install:all
```

#### Run the services

This will run all the services parallelly. You can see the editor on `http://localhost:8080`.

```bash
yarn dev
```

**For development for editor-server**

You need to have MongoDB running on `mongodb://localhost:27017`

```bash
docker-compose -f dev.docker-compose.yml up -d mongodb redisdb
```

## Production

Create the `eeinfo` network

```bash
docker network create eeinfo
```

Run services `nginx`, `editor`, `editor-server`, `file-server`, `redisdb`, `mongodb`.

```bash
docker-compose -f prod-support/prod.docker-compose.yml up -d
```

Editor will run on `http://localhost:8080`.

Editor-server will run on `http://localhost:4000`.

### Initialize Database

After starting all services, one must initialize the database.

```bash
cd utils && yarn
export NODE_OPTIONS="--max-old-space-size=8192" // Incase heap out of memory
node initDB.js ${filePath}
// node initDB.js ../others/2022_ee_night/exportData.json
node initLED.js ${filePath}
// node initLED.js ../others/2022_ee_night/exportLED.json
```
