import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
  } from "../../../components/ui/alert-dialog";
  import PropTypes from "prop-types";
  
  function ThumbnailPreview({ imageUrl }) {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex aspect-video h-9">
            <img src={imageUrl} alt="image" width={50} className="rounded-sm" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex">
            <img src={imageUrl} alt="file preview" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  ThumbnailPreview.propTypes = {
    imageUrl: PropTypes.string,
  };
  
  export default ThumbnailPreview;