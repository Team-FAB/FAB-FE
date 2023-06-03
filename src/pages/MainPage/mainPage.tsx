import React, { useState } from "react";
import styles from "./mainPage.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MainPostCard from "../../components/MainPostCard/mainPostCard";
import RecommendPostCard from "../../components/RecommendCard/recommendCard";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import PostModal from "../../components/PostModal/postModal";

const CustomRightArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customRightArrow}>
      <AiFillCaretRight className={styles.RightArrow} size={50} />
    </button>
  );
};

const CustomLeftArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customLeftArrow}>
      <AiFillCaretLeft className={styles.LeftArrow} size={50} />
    </button>
  );
};

const MainPage: React.FC = () => {
  const adImages = [
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
  };

  const posts = [
    { id: 1, title: "Title 1", content: "Post 1" },
    { id: 2, title: "Title 2", content: "Post 2" },
    { id: 3, title: "Title 3", content: "Post 3" },
    { id: 4, title: "Title 4", content: "Post 4" },
    { id: 5, title: "Title 5", content: "Post 5" },
    { id: 6, title: "Title 6", content: "Post 6" },
    { id: 7, title: "Title 7", content: "Post 7" },
    { id: 8, title: "Title 8", content: "Post 8" },
    { id: 9, title: "Title 9", content: "Post 9" },
    { id: 10, title: "Title 10", content: "Post 10" },
    { id: 11, title: "Title 11", content: "Post 11" },
    { id: 12, title: "Title 12", content: "Post 12" },
  ];

  const [selectedPost, setSelectedPost] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);

  const handlePostClick = (post: {
    id: number;
    title: string;
    content: string;
  }) => {
    setSelectedPost(post);
  };
  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className={styles.conatainer}>
      <div className={styles.adContainer}>
        <Carousel
          showThumbs={false}
          swipeable={true}
          infiniteLoop={true}
          autoPlay
          interval={3000}
          showIndicators={false}
        >
          {adImages.map((url, index) => (
            <div key={index}>
              <img src={url} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.mainPost}>
        <div className={styles.title}>룸메이트 구해요 👋</div>
        <MultiCarousel
          responsive={responsive}
          infinite={true}
          draggable={true}
          showDots={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {posts.map((post) => (
            <MainPostCard key={post.id} onClick={() => handlePostClick(post)} />
          ))}
        </MultiCarousel>
      </div>
      <div className={styles.recommendPost}>
        <div className={styles.title}>
          방갑고에서 추천하는 룸메이트를 만나보세요 💌
        </div>
        <MultiCarousel
          responsive={responsive}
          infinite={true}
          draggable={true}
          showDots={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
        </MultiCarousel>
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MainPage;
