import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  emotion?: string
  cbtTechnique?: string
}

export interface IConversation extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  messages: IMessage[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  emotion: {
    type: String,
    default: ''
  },
  cbtTechnique: {
    type: String,
    default: ''
  }
}, { _id: false })

const conversationSchema = new Schema<IConversation>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, '标题不能超过100个字符']
  },
  messages: [messageSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// 索引优化
conversationSchema.index({ userId: 1, createdAt: -1 })
conversationSchema.index({ userId: 1, isActive: 1 })

export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema)