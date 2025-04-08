
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Heart, Flag } from 'lucide-react';

interface Post {
  id: string;
  username: string;
  content: string;
  date: Date;
  likes: number;
  userLiked: boolean;
  replies: Reply[];
}

interface Reply {
  id: string;
  username: string;
  content: string;
  date: Date;
  likes: number;
  userLiked: boolean;
}

const CommunityForum = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('communityPosts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((post: any) => ({
          ...post,
          date: new Date(post.date),
          replies: post.replies.map((reply: any) => ({
            ...reply,
            date: new Date(reply.date),
          })),
        }));
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState<{[key: string]: string}>({});
  const [activeReplies, setActiveReplies] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  // Save posts to localStorage whenever they change
  useState(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  });

  const handleCreatePost = () => {
    if (newPostContent.trim() === '') return;

    const newPost: Post = {
      id: crypto.randomUUID(),
      username: 'Anonymous User', // In a real app, this would be the logged-in user
      content: newPostContent,
      date: new Date(),
      likes: 0,
      userLiked: false,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    
    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    });
  };

  const toggleReplyForm = (postId: string) => {
    setActiveReplies({
      ...activeReplies,
      [postId]: !activeReplies[postId]
    });
  };

  const handleCreateReply = (postId: string) => {
    if (!replyContent[postId] || replyContent[postId].trim() === '') return;

    const newReply: Reply = {
      id: crypto.randomUUID(),
      username: 'Anonymous User', // In a real app, this would be the logged-in user
      content: replyContent[postId],
      date: new Date(),
      likes: 0,
      userLiked: false
    };

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, newReply]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setReplyContent({
      ...replyContent,
      [postId]: ''
    });
    
    // Close the reply form
    setActiveReplies({
      ...activeReplies,
      [postId]: false
    });
    
    toast({
      title: "Reply posted!",
      description: "Your reply has been added to the discussion.",
    });
  };

  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.userLiked ? post.likes - 1 : post.likes + 1,
          userLiked: !post.userLiked
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.userLiked ? reply.likes - 1 : reply.likes + 1,
              userLiked: !reply.userLiked
            };
          }
          return reply;
        });
        
        return {
          ...post,
          replies: updatedReplies
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient">Community Forum</CardTitle>
        <CardDescription>Connect with others, share experiences, and find support</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Create new post */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Share your thoughts with the community</p>
          <Textarea
            placeholder="Write your post here..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <Button onClick={handleCreatePost} className="mt-2">Post</Button>
        </div>
        
        {/* Posts list */}
        <div className="space-y-6 mt-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-2 text-lg font-medium">No posts yet</p>
              <p className="text-sm text-muted-foreground">
                Be the first to start a conversation!
              </p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="border rounded-lg p-4">
                {/* Post header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{post.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.username}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" title="Report">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Post content */}
                <div className="mt-4">
                  <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                </div>
                
                {/* Post actions */}
                <div className="flex items-center gap-4 mt-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => handleLikePost(post.id)}
                  >
                    <Heart className={`h-4 w-4 ${post.userLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{post.likes}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => toggleReplyForm(post.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                </div>
                
                {/* Reply form */}
                {activeReplies[post.id] && (
                  <div className="mt-4 pl-8 border-l-2">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyContent[post.id] || ''}
                      onChange={(e) => setReplyContent({...replyContent, [post.id]: e.target.value})}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="outline" onClick={() => toggleReplyForm(post.id)}>Cancel</Button>
                      <Button onClick={() => handleCreateReply(post.id)}>Reply</Button>
                    </div>
                  </div>
                )}
                
                {/* Replies */}
                {post.replies.length > 0 && (
                  <div className="mt-6 pl-8 border-l-2 space-y-4">
                    {post.replies.map(reply => (
                      <div key={reply.id} className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{reply.username[0]}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium">{reply.username}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(reply.date)}</p>
                        </div>
                        <p className="text-sm mt-2 whitespace-pre-wrap">{reply.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-2 h-7 px-2"
                            onClick={() => handleLikeReply(post.id, reply.id)}
                          >
                            <Heart className={`h-3 w-3 ${reply.userLiked ? 'fill-red-500 text-red-500' : ''}`} />
                            <span className="text-xs">{reply.likes}</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityForum;
