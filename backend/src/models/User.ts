import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, '请输入姓名'],
    trim: true,
    minlength: [2, '姓名至少2个字符'],
    maxlength: [50, '姓名不能超过50个字符']
  },
  email: {
    type: String,
    required: [true, '请输入邮箱'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '请输入有效的邮箱地址']
  },
  password: {
    type: String,
    required: [true, '请输入密码'],
    minlength: [6, '密码至少6位字符'],
    select: false
  },
  avatar: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

// 密码加密中间件
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12')
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
})

// 密码比较方法
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema)