import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "./theme-xenon";
import React, {useCallback} from "react";
import {setSelectedText, setText} from "../reducks/edit/actions";
import {useDispatch, useSelector} from "react-redux";
import AceEditor from "react-ace";
import {getNewText} from "../reducks/file/selectors";
import {getText} from "../reducks/edit/selectors";


let
    // エディタインスタンス
    editorInstance = "",
    // EditAreaに表示する文字列
    textValue = "";

export default function EditArea () {

    textValue = getNewText(useSelector((state) => state));
    const dispatch = useDispatch(),
        onChange = useCallback(() => {

            dispatch(setText(editorInstance));

        }),
        onLoad = useCallback((newEditor) => {

            editorInstance = newEditor;
            dispatch(setText(editorInstance));

        }),
        onSelectionChange = useCallback(() => {

            dispatch(setSelectedText(editorInstance));

        }),
        text = getText(useSelector((state) => state));
    if (editorInstance) {

        textValue = text;

    }
    return (
        <div className="bg-gray-900 flex-auto">
            <AceEditor
                editorProps={{"$blockScrolling": "true"}}
                focus={false}
                fontSize="16px"
                height="100%"
                highlightActiveLine={false}
                mode="c_cpp"
                name="UNIQUE_ID_OF_DIV"
                onChange={onChange}
                onLoad={onLoad}
                onSelectionChange={onSelectionChange}
                showPrintMargin={false}
                tabSize={4}
                theme="xenon"
                value={textValue}
                width="100%"
                wrapEnabed={false}
            />
        </div>
    );

}
