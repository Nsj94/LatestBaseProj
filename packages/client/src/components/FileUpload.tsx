//@ts-nocheck
import { Upload, notification } from "antd";
import { useTranslation } from "react-i18next";
import API_SERVICE from "../services/api-service";

export default function FileUpload(props: any) {
  const { t } = useTranslation();

  const a = props.defaultFiles
    ? [
        {
          uid: props.defaultFiles?.id,
          name: props.defaultFiles?.name,
          status: "done",
          response: "Server Error 500",
          url: props.defaultFiles?.url,
        },
      ]
    : [];

  const uploadProps = {
    defaultFileList: a,
  };
  async function handleUpload(file: any) {
    try {
      const response = await API_SERVICE.fileUpload(props.type, file);
      const {
        data: { id, url },
      } = response.data;
      props.onChange(id);
      if (props.callback) {
        props.callback({ id, url });
      }
    } catch (e) {
      notification.error({
        message: API_SERVICE.handleErrors(e),
        placement: "bottomRight",
      });
    }
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    //@ts-ignore
    <Upload
      {...uploadProps}
      multiple={false}
      showUploadList={props.showList ? false : true}
      onPreview={onPreview}
      beforeUpload={(file) => {
        /*const isFileAllowed = file.type.includes(props.fileType);

                if (!isFileAllowed) {
                    notification.error({message: t(`${file.name} is not Allowed, please select appropriate file`)});
                    //@ts-ignore
                    return Upload.LIST_IGNORE;
                } else {
                    handleUpload(file);
                    return true;
                }*/

        if (props.type === "THUMBNAIL") {
          // console.log(file.type);
          const isFileAllowed =
            file.type.includes("png") ||
            file.type.includes("jpg") ||
            file.type.includes("jpeg");
          if (!isFileAllowed) {
            notification.error({
              message: t(
                `${file.name} is not Allowed, please select appropriate file`
              ),
              placement: "bottomRight",
            });
            //@ts-ignore
            return Upload.LIST_IGNORE;
          }
        }
        handleUpload(file);
        // return true;
      }}
    >
      {props.children}
    </Upload>
  );
}
