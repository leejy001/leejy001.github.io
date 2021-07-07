import React, { useState } from "react";
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
import dotenv from "dotenv";
import { POST_UPLOADING_REQUEST } from "../../redux/types";
dotenv.config();

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({
    title: "",
    contents: "",
    fileUrl: "",
  });
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl, category } = form;
    const token = localStorage.getItem("token");
    const body = { title, contents, fileUrl, category, token };
    console.log(contents);
    dispatch({
      type: POST_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const onChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    console.log(data);

    if (data && data.match("<img src=")) {
      const whereImg_start = data.indexOf("<img src=");
      console.log(whereImg_start, "whereImg_start");
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
        console.log(ext_name[i]);
        if (data.match(ext_name[i])) {
          console.log(data.indexOf(`${ext_name[i]}`), "indexOf");
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }
      console.log(ext_name_find, "ext_name_find");
      console.log(whereImg_end, "whereImg_end");

      if (ext_name_find === "jpeg" || ext_name_find === "JPEG") {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      console.log(result_Img_Url, "result_Img_Url");
      setValues({
        ...form,
        fileUrl: result_Img_Url,
        contents: data,
      });
    } else {
      setValues({
        ...form,
        fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,
        contents: data,
      });
    }
    console.log(data);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Form
          onSubmit={onSubmit}
          style={{
            width: "800px",
            margin: "0 auto",
            textAlign: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <FormGroup className="mb-2">
            <Label className="mb-1" for="title">
              Title
            </Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <Label className="mb-1" for="category">
              Category
            </Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <Label className="mb-1" for="content">
              Content
            </Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
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

export default PostWrite;
