export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  avatarImage: string;
  websiteUrl: string;
  location: string;
  bioDescription: string;
  skills: string;
  languages: string;
  learningInfo: string;
  education: string;
  work: string;
  job: string;
  availableFor: string;
  isActive: boolean
  createdAt: Date
  updatedAt: Date;
}
