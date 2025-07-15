// V1.1.GDW
// From: Imgs-V1.0.EDDG

var Assets = {
    list: {},
    path: "./Assets/",
    // Extensions d'images prises en charge par les navigateurs web
    imageExtensions: [
        'jpg', 'jpeg',      // JPEG/JPG
        'png',              // Portable Network Graphics
        'gif',              // Graphics Interchange Format
        'webp',             // WebP (Google)
        'svg',              // Scalable Vector Graphics
        'bmp',              // Bitmap
        'ico',              // Icon
        'avif'              // AV1 Image File Format (nouveau format)
    ],

    // Extensions audio prises en charge par les navigateurs web
    audioExtensions: [
        'mp3',              // MPEG Audio Layer III
        'wav',              // Waveform Audio File Format
        'ogg',              // Ogg Vorbis
        'aac',              // Advanced Audio Coding
        'm4a',              // MPEG-4 Audio
        'opus',             // Opus audio codec
        'flac',             // Free Lossless Audio Codec
        'webm'              // WebM audio (souvent utilisé avec Opus ou Vorbis)
    ],

    create: (name, type) => {
        let asset;
        switch (type) {
            case 'Image':
                asset = new Image();
                break;
            case 'Audio':
                asset = new Audio();
                break;

            default:
                return undefined;

        }

        asset.src = Assets.path + type + "s/" + name;
        asset.isLoading = true;
        asset.isLoaded = undefined;
        asset.onload = () => {
            asset.isLoaded = true;
            asset.isLoading = false;
        };
        asset.onerror = function () {
            asset.isLoaded = false;
            asset.isLoading = false;
        };

        return asset;
    },

    get: (name, type = undefined) => {
        let asset = Assets.list[name];
        if (asset && !asset.isLoading && !asset.isLoaded) {
            delete asset;
        }
        if (!asset) {
            if (!type){
                let ext = name.split('.');
                ext = ext[ext.length - 1];
                if (Assets.imageExtensions.includes(ext)) type = 'Image';
                if (Assets.audioExtensions.includes(ext)) type = 'Audio';
            }
            asset = Assets.create(name, type);
            Assets.list[name] = asset;
        }
        return asset;
    },

    isLoaded: (name, interval) => {
        return wait(() => Assets.list[name].isLoaded, interval);
    },

    isAvaible: (name, interval) => {
        return wait(() => !Assets.list[name].isLoading, interval);
    }


};


var AssetsJSLoaded = true;