import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import PropTypes from "prop-types";

function Sort({ setSortValue, setOrder }) {
  return (
    <div className="flex items-start gap-2 my-auto">
      <Select onValueChange={(value) => setSortValue(value)}>
        <SelectTrigger className="min-w-[150px] max-md:w-[100px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Name</SelectItem>
          <SelectItem value="createdAt">Date Added</SelectItem>
          <SelectItem value="messages">Comments</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setOrder(value)}>
        <SelectTrigger className="min-w-[150px] max-md:w-[100px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent className="max-md:text-left">
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

Sort.propTypes = {
  setSortValue: PropTypes.func,
  setOrder: PropTypes.func,
};

export default Sort;