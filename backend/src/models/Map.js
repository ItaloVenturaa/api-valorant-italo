import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  narrativeDescription: String,
  splash: String
}, { timestamps: true });

const Map = mongoose.model('Map', mapSchema);
export default Map;
