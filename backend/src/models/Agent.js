import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  description: String,
  role: {
    displayName: String,
    displayIcon: String
  },
  abilities: [
    {
      displayName: String,
      description: String,
      displayIcon: String
    }
  ],
  fullPortrait: String
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;
