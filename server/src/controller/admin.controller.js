import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

//helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to Cloudinary");
  }
};

// create new Song
export const createSong = async (req, res, next) => {
  try {
    // if admin does not upload files or audioFiles or imageFiles
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please Upload all files" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null, // if album exists or null
    });
    await song.save();

    // if song belongs to an album, update the album's song array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong", error);
    next(error);
  }
};

// Delete Song with SongId
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params; // grab the song id from parameter
    const song = await Song.findById(id);

    //if the song belongs to an album, update the album's song array
    if (song.albumId) {
      await Album.findOneAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    await Song.findByIdAndDelete(id); // find the song id and delete
    res.status(200).json({ message: "Song deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
};

// create Album
export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await album.save();
    res.status(200).json(album);
  } catch (error) {
    console.log("Error in createAlbum", error);
    next(error);
  }
};

// delete Album
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id }); // delete all songs in album
    await Album.findByIdAndDelete(id); // delete the album
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
