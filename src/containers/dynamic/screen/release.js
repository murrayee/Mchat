import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {
  RichTextEditor,
  RichTextToolbar
} from 'react-native-zss-rich-text-editor';

export default class RichTextExample extends Component {
  constructor(props) {
    super(props);
    // this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);

    this.actions={
        setTitleHtml: 'SET_TITLE_HTML',
        setContentHtml: 'SET_CONTENT_HTML',
        getTitleHtml: 'GET_TITLE_HTML',
        getTitleText: 'GET_TITLE_TEXT',
        getContentHtml: 'GET_CONTENT_HTML',
        getSelectedText: 'GET_SELECTED_TEXT',
        blurTitleEditor: 'BLUR_TITLE_EDITOR',
        blurContentEditor: 'BLUR_CONTENT_EDITOR',
        focusTitle: 'FOCUS_TITLE',
        focusContent: 'FOCUS_CONTENT',

        setBold: 'bold',
        setItalic: 'italic',
        setUnderline: 'underline',
        heading1: 'h1',
        heading2: 'h2',
        heading3: 'h3',
        heading4: 'h4',
        heading5: 'h5',
        heading6: 'h6',
        setParagraph: 'SET_PARAGRAPH',
        removeFormat: 'REMOVE_FORMAT',
        alignLeft: 'justifyLeft',
        alignCenter: 'justifyCenter',
        alignRight: 'justifyRight',
        alignFull: 'justifyFull',
        insertBulletsList: 'unorderedList',
        insertOrderedList: 'orderedList',
        insertLink: 'INST_LINK',
        updateLink: 'UPDATE_LINK',
        insertImage: 'INST_IMAGE',
        setSubscript: 'subscript',
        setSuperscript: 'superscript',
        setStrikethrough: 'strikeThrough',
        setHR: 'horizontalRule',
        setIndent: 'indent',
        setOutdent: 'outdent',
        setTitlePlaceholder: 'SET_TITLE_PLACEHOLDER',
        setContentPlaceholder: 'SET_CONTENT_PLACEHOLDER',
        setTitleFocusHandler: 'SET_TITLE_FOCUS_HANDLER',
        setContentFocusHandler: 'SET_CONTENT_FOCUS_HANDLER',
        prepareInsert: 'PREPARE_INSERT',
        restoreSelection: 'RESTORE_SELECTION',
        setCustomCSS: 'SET_CUSTOM_CSS',
        setTextColor: 'SET_TEXT_COLOR',
        setBackgroundColor: 'SET_BACKGROUND_COLOR',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RichTextEditor
          ref={r => (this.richtext = r)}
          style={styles.richText}
          editorInitializedCallback={() => this.onEditorInitialized()}
        />
        <RichTextToolbar getEditor={() => this.richtext}  actions={Object.keys(this.actions).map((v)=>this.actions[v])}/>
      </View>
    );
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    // this.getHTML();
  }

  // async getHTML() {
  //   const titleHtml = await this.richtext.getTitleHtml();
  //   const contentHtml = await this.richtext.getContentHtml();
  //   //alert(titleHtml + ' ' + contentHtml)
  // }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 40
  },
  richText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});
