import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Progress,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import MyInit from "../../components/editor/UploadAdapter";
import { POST_EDIT_UPLOADING_REQUEST } from "../../redux/types";

const PostEdit = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({
    title: "",
    contents: "",
    fileUrl: "",
    cardcontent: "",
  });
  const { postDetail } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl, cardcontent } = form;
    const token = localStorage.getItem("token");
    const id = postDetail._id;
    const body = { title, contents, fileUrl, cardcontent, token, id };
    dispatch({
      type: POST_EDIT_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const onChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setValues({
      title: postDetail.title,
      contents: postDetail.contents,
      fileUrl: postDetail.fileUrl,
    });
  }, [postDetail.title, postDetail.contents, postDetail.fileUrl]);

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    let content = "";
    console.log(data);
    if (data && data.match("<p")) {
      const whereContent_start = data.indexOf(">");
      let whereContent_end = data.indexOf("</p>");
      content = data.substring(whereContent_start + 1, whereContent_end);
      console.log(content, "content");
    }

    if (data && data.match("<img src=")) {
      const whereImg_start = data.indexOf("<img src=");
      console.log(whereImg_start);
      let whereImg_end = "";
      let ext_name_find = "";
      let result_Img_Url = "";
      const ext_name = [
        "JPEG",
        "jpeg",
        "PNG",
        "png",
        "JPG",
        "jpg",
        "GIF",
        "gif",
      ];

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          console.log(data.indexOf(`${ext_name[i]}`));
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }
      console.log(ext_name_find);
      console.log(whereImg_end);

      if (ext_name_find === "jpeg" || ext_name_find === "JPEG") {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      console.log(result_Img_Url, "result_Img_Url");
      setValues({
        ...form,
        fileUrl: result_Img_Url,
        cardcontent: content,
        contents: data,
      });
    } else {
      setValues({
        ...form,
        fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,
        cardcontent: content,
        contents: data,
      });
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              defaultValue={postDetail.title}
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={postDetail.contents}
              onReady={MyInit}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              제출하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
};

export default PostEdit;
