interface PostCardProps {
    text: string;
    imageUrl?: string;
    createdBy: string;
  }
  
  const PostCard: React.FC<PostCardProps> = ({ text, imageUrl, createdBy }) => {
    return (
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <h4 className="text-gray-700 font-bold">{createdBy}</h4>
        <p className="text-gray-600 mt-2">{text}</p>
        {imageUrl && <img src={imageUrl} alt="Post" className="mt-2 rounded-md" />}
      </div>
    );
  };
  
  export default PostCard;
  