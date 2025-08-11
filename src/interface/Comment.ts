// Comment Interface Definitions
export interface Comment {
  id: number;
  postId: number;
  userId: number;
  parentId?: number | null; // null for root comments, number for replies
  content: string;
  createdAt: string;
  updatedAt?: string;
  isDeleted?: boolean;
  favoriteCount?: number;
  isFavorite?: boolean;
  replies?: Comment[]; // Nested replies
  level?: number; // Depth level for UI rendering (0 = root, 1 = first reply, etc.)
}

export interface CommentUser {
  id: number;
  username: string;
  avatar?: string;
  email: string;
}

export interface CommentFormData {
  id: number;
  userid: number;
  postid: number;
  content: string;
  createdat: string;
  iconid: number;
  imgurl: string;
  commentid: number;
}

export interface CommentCreateRequest {
  userid: number;
  postid: number;
  content: string;
  iconid?: number;
  imgurl?: string;
  commentid?: number;
  // Không cần createdat - backend tự tạo
}


export interface CommentState {
  items: Comment[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

export interface PostDetailModalProps {
  visible: boolean;
  onClose: () => void;
  post: {
    id: number;
    userid: number;
    content: string;
    createdat: string;
    images?: string[];
    comments?: number;
    shares?: number;
  } | null;
  postImages?: string[];
  favoriteCounts: Record<number, number>;
  handleLike: (postId: number) => void;
  isFavorite: (postId: number) => boolean;
  currentUserId?: number;
}

export interface CommentItemProps {
  comment: Comment;
  level: number;
  onReply: (commentId: number, content: string) => void;
  onFavorite: (commentId: number) => void;
  users: CommentUser[];
  currentUserId?: number;
  maxLevel?: number; // Maximum nesting level allowed
}

export interface CommentFormProps {
  postId: number;
  parentId?: number | null;
  placeholder?: string;
  onSubmit: (data: CommentFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
  autoFocus?: boolean;
  compact?: boolean; // For reply forms
}

// API Response interfaces
export interface CommentApiResponse {
  success: boolean;
  data: Comment;
  message?: string;
}

export interface CommentsListApiResponse {
  success: boolean;
  data: Comment[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

// Utility types for comment operations
export type CommentAction = 'create' | 'update' | 'delete' | 'favorite' | 'unfavorite';

export interface CommentOperation {
  action: CommentAction;
  commentId?: number;
  data?: Partial<Comment>;
}

// Tree structure helpers
export interface CommentTree {
  comment: Comment;
  children: CommentTree[];
  level: number;
}

// Sort options for comments
export type CommentSortOption = 'newest' | 'oldest' | 'mostFavorite' | 'mostReplies';

export interface CommentFilters {
  sortBy: CommentSortOption;
  showDeleted: boolean;
  userId?: number; // Filter by specific user
}
