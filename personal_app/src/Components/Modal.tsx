import { useState } from "react"

const Modal = props => {
    if (!props.show) {
        return null
    }
    return (
        <div>
            <div>
                <div>
                    <h4>
                        modal title
                    </h4>
                </div>
                <div>
                    Modal content
                </div>
                <div>
                    <button onClick = {props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal