import StoryModel from "../models/StoryModel";
import "./FilteredStories.css";
import SingleStory from "./SingleStory";

interface Props {
  stories: StoryModel[];
}

const FilteredStories = ({ stories }: Props) => {
  return (
    <div className="FilteredStories">
      {" "}
      {stories.map((item) => (
        <SingleStory key={item._id} story={item} />
      ))}
    </div>
  );
};

export default FilteredStories;
