import { Card, Tag } from "antd";
const { Meta } = Card;

const PostCard = ({ title, body, tags, reactions }) => {
  return (
    <Card
      style={{
        marginBottom: 16,
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Meta
        title={<strong style={{ fontSize: "1.1rem" }}>{title}</strong>}
        description={
          <>
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                fontSize: "1rem",
                margin: "8px 0",
              }}
            >
              {body}
            </p>
            <div style={{ margin: "8px 0" }}>
              {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
            <div>
              👍 {reactions.likes} | 👎 {reactions.dislikes}
            </div>
          </>
        }
      />
    </Card>
  );
};

export default PostCard;
