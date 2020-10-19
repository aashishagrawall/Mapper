import React from "react";
import ReactJson from "react-json-view";

class JsonViewer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { onAdd, onEdit, onDelete, src, displayDataTypes } = this.props;
    const style = {
      padding: "10px",
      borderRadius: "3px",
      margin: "10px 0px",
    };

    return (
      <div>
        <ReactJson
          name={false}
          collapsed={false}
          style={style}
          theme="tube"
          src={src}
          onEdit={
            onEdit
              ? (e) => {
                  console.log(e);
                  this.setState({ src: e.updated_src });
                }
              : false
          }
          onDelete={
            onDelete
              ? (e) => {
                  console.log(e);
                  this.setState({ src: e.updated_src });
                }
              : false
          }
          onAdd={
            onAdd
              ? (e) => {
                  console.log(e);
                  this.setState({ src: e.updated_src });
                }
              : false
          }
          displayObjectSize={true}
          enableClipboard={(copy) => {
            const container = document.createElement("textarea");
            const val = copy.src;

            container.innerHTML =
              typeof val === "string" ? val : JSON.stringify(val, null, 4);

            document.body.appendChild(container);
            container.select();
            // copy the same quote-less value back to the clipboard
            document.execCommand("copy");
            document.body.removeChild(container);
          }}
          displayDataTypes={displayDataTypes}
          iconStyle="triangle"
        />
      </div>
    );
  }
}

export default JsonViewer;
