import "./FilterForm.css";

interface Props {
  setFilter: (value: string) => void;
}

const FilterForm = ({ setFilter }: Props) => {
  return (
    <form className="FilterForm">
      <select
        name="sort"
        id="sort"
        className="select-dropdown"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">sort / filter</option>
        <option value="favorite">favorites</option>
        <option value="old">oldest first</option>
        <option value="new">newest first</option>
        <option value="public">public</option>
        <option value="private">private</option>
      </select>
    </form>
  );
};

export default FilterForm;
