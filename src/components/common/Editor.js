import React, { Component } from 'react';
import {Form} from 'antd';
import {uploadImage} from "../../helpers/services";
import {noti} from "../../helpers/utils";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ImageResize from 'quill-image-resize-module-react';
// import ImageCompress from 'quill-image-compress';
import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/imageResize', ImageResize);
// Quill.register('modules/imageCompress', ImageCompress);
Quill.register('modules/blotFormatter', BlotFormatter);



let quillObj = {};
class Editor extends Component {

    state = {
        editorHtml: '123',
        uploading: false,
    };

    handleChange = (content, delta, source, editor) => {
        // console.log(editor.getHTML()); // rich text
        // console.log(editor.getText()); // plain text
        // console.log(editor.getLength()); // number of characters
        this.setState({ editorHtml: content });
    }

    imageHandler = () => {
        this.setState({ uploading: true });

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('file', file);

            // Save current cursor state
            const range = quillObj.getEditorSelection();

            try {
                const res = await uploadImage(formData, {});
                noti.success("Upload image successfully!")
                this.setState({ uploading: false });

                // Insert uploaded image
                quillObj.getEditor().insertEmbed(range.index, 'image', res.data.link);

            } catch (err) {
                console.log(err)
                noti.error("Upload image failed!")
                this.setState({ uploading: false });
            }

        };
    }

    render() {
        /*
        * Quill modules to attach to editor
        * See https://quilljs.com/docs/modules/ for complete options
        */
        const modules = {
            toolbar: {
                container: [
                    [{ font: [] }, { header: [] }, {size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                        {list: 'ordered'},
                        {list: 'bullet'},
                        {indent: '-1'},
                        {indent: '+1'}
                    ],
                    [{ 'align': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
                handlers: {
                    image: this.imageHandler
                }
            },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false
            },
            imageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize']
            },
            // imageCompress: {
            //     quality: 0.7, // default
            //     maxWidth: 1000, // default
            //     maxHeight: 1000, // default
            //     imageType: 'image/jpeg', // default
            //     debug: true, // default
            //     suppressErrorLogging: false, // default
            // },
            // blotFormatter: {
            //     overlay: {
            //         style: {
            //             border: '2px solid red',
            //         }
            //     }
            // },
        };

        /*
         * Quill editor formats
         * See https://quilljs.com/docs/formats/
         */
        // const formats = [
        //     'header',
        //     'font',
        //     'size',
        //     'bold',
        //     'italic',
        //     'underline',
        //     'strike',
        //     'blockquote',
        //     'list',
        //     'bullet',
        //     'indent',
        //     'align',
        //     'color',
        //     'background',
        //     'link',
        //     'image',
        //     'video'
        // ];

        return (
            <ReactQuill
                ref={(el) => {
                    quillObj = el;
                }}
                theme="snow"
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={modules}
                // formats={formats}
            />
        );
    }
}

export default Form.create()(Editor);