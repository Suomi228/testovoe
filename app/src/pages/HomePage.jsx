import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";
import PostCard from "../components/postCard";
import { STATUS } from "../constants";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status, hasMore } = useSelector((state) => state.posts);
  const isLoading = status === STATUS.PENDING;

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoading &&
      hasMore
    ) {
      dispatch(getPosts(items.length));
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getPosts(0));
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, items.length, dispatch]);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      {items.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          tags={post.tags}
          reactions={post.reactions}
        />
      ))}

      {isLoading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      )}

      {!hasMore && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Больше новостей нет
        </div>
      )}
    </div>
  );
};

export default HomePage;
