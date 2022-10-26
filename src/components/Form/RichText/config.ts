import { IAllProps } from "@tinymce/tinymce-react";
import { uploadApi } from "lib/api";

export const init: IAllProps["init"] = {
  height: 500,
  menubar: true,
  plugins: [
    "advlist autolink lists link image paste charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media paste table help wordcount imagetools",
  ],
  toolbar:
    "bold italic backcolor forecolor fontsizeselect | link unlink |  image media table |  bullist numlist | removeformat |" +
    "formatselect | alignleft aligncenter alignright alignjustify | outdent indent | fontselect | code",
  toolbar_mode: "sliding",
  file_picker_types: "image media file",
  file_picker_callback: function (cb, value, meta) {
    let accept = "image/*";
    let url = "upload-file";

    const input = document.createElement("input");

    if (meta.filetype !== "image") {
      accept = "image/*, .pdf";
    }

    input.setAttribute("type", "file");
    input.setAttribute("accept", accept);
    input.onchange = async function (event: Event) {
      const target = event.target as HTMLInputElement;
      const file = (target.files as FileList)[0];

      if (file.type.includes("pdf")) {
        url = "upload-pdf";
      }

      try {
        const res = await uploadApi(
          file,
          {
            url,
          },
          "content-images"
        );
        cb(res.data.url, { title: file.name, text: file.name });
      } catch (error) {
        cb();
      }
    };

    input.click();
  },
  automatic_uploads: true,
  async images_upload_handler(
    blobInfo,
    success,
    failure,
    progress = () => undefined
  ) {
    try {
      const res = await uploadApi(
        blobInfo.blob() as File,
        {
          onUploadProgress: function (e) {
            progress((e.loaded / e.total) * 100);
          },
        },
        "content-images"
      );
      success(res.data.link);
    } catch (error: any) {
      if (error.httpStatus === 403) {
        failure("HTTP Error: " + error.httpStatus, { remove: true });
        return;
      }

      if (error.httpStatus < 200 || error.httpStatus >= 300) {
        failure("HTTP Error: " + error.httpStatus);
        return;
      }
    }
  },
  paste_data_images: true,
  content_style:
    'body { font-family: "Noto Sans JP",Helvetica,Arial,sans-serif; font-size:14px }',
  forced_root_block: false,
  fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
};

export const apiKey = "ihjb5jxslfupjdzsd7mio3x45rpf6dqijitursswe99oqg7v";
