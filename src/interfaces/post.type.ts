export interface PostData {
  _id: string;
  image: string;
  fullText: string;
  title: string;
  description: string;
  dateCreated: string;
  postedBy: string;
  likes: string[];
}

export type EditPostData = Pick<
  PostData,
  "_id" | "title" | "description" | "fullText"
>;
