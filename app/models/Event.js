import { model, models, Schema } from "mongoose"

const EventSchema = new Schema({
    type: String, // click or view
    uri: String,  // dawid | https://

},{timestamps:true})

export const Event = models?.Event || model('Event', EventSchema);