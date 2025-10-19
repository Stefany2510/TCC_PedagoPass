export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface PostAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  school?: string;
  subject?: string;
  segment?: string;
  verified: boolean;
}

export interface Media {
  id: string;
  postId: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  duration?: number;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  author?: PostAuthor;
  content: string;
  media: Media[];
  communityId?: string;
  destinationId?: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  likedByCurrentUser?: boolean;
}

export interface CreatePostDTO {
  content: string;
  communityId?: string;
  destinationId?: string;
  tags?: string[];
}

export interface UpdatePostDTO {
  content?: string;
  tags?: string[];
}

export type PostSortOption = 'recent' | 'popular';

export interface PostFilters {
  communityId?: string;
  destinationId?: string;
  authorId?: string;
  tag?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: PostSortOption;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: PostAuthor;
  content: string;
  parentCommentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  success: boolean;
  posts: Post[];
  total: number;
  hasMore: boolean;
  nextOffset?: number;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
