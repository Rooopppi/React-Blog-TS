import { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Post from "../Post/Post";
import PaginationStyled from "./PaginatedPosts.styled";
import { PostData } from "../../interfaces/post.type";

interface Props {
  allPosts: PostData[];
  search: string;
  sortKey: string;
}

const PaginatedPosts = ({ allPosts, search, sortKey }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => {
    if (search) {
      return allPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return allPosts
      .slice(indexOfFirstPost, indexOfLastPost)
      .reverse()
      .sort((a, b) => {
        if (sortKey) {
          if (
            sortKey === "title"
              ? a.title > b.title
              : a.dateCreated > b.dateCreated
          ) {
            return -1;
          }
          if (
            sortKey === "title"
              ? a.title > b.title
              : a.dateCreated > b.dateCreated
          ) {
            return 1;
          }
        }
        return 0;
      });
  }, [search, allPosts, indexOfFirstPost, indexOfLastPost, sortKey]);

  const pageCount = Math.ceil(allPosts.length / postsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <>
      <div className="entry">
        {currentPosts.map((post) => {
          return (
            <Post
              // eslint-disable-next-line no-underscore-dangle
              key={post._id}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...post}
            />
          );
        })}
      </div>
      <PaginationStyled>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
        />
      </PaginationStyled>
    </>
  );
};

export default PaginatedPosts;
