import { Button, Col, message, Row, Tooltip } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BRESENHAM, colorToRGB, fillPixel, hex2RGB, arrayRgbFormat, isCanvasBlank } from 'utils/paint-pixel';
import "slider-color-picker";
import { BgColorsOutlined, HighlightOutlined } from '@ant-design/icons';

function PixelPaint(props) {
    const { sendCanvasImage, closeModal } = props
    const [tool, setTool] = useState("pencil")
    const [color, setColor] = useState([196, 196, 196])
    const [toolColor, setToolColor] = useState(colorToRGB([196, 196, 196]))
    const colorRef = useRef();
    const canvasRef = useRef();
    const [canvasRes, setCanvasRes] = useState(16)
    const onColorChange = (event) => {
        const { value } = event.target
        let rgbColor = hex2RGB(value);
        setToolColor(colorToRGB(rgbColor))
    };

    useLayoutEffect(() => {
        colorRef.current.addEventListener("change", onColorChange);
    }, [colorRef]);

    useLayoutEffect(() => {
        canvasRef.current.onmousedown = (e) => {
            if (tool === "pencil") {
                pencilPaint(e)
            } else if (tool === "bucket") {
                bucketPaint(e);
            }
        }
        function pencilPaint(e) {
            let x = e.offsetX;
            let y = e.offsetY;
            pixelPaint(x, y)
            let lastX = x;
            let lastY = y;

            canvasRef.current.onmousemove = (e) => {
                let x = e.offsetX;
                let y = e.offsetY;
                pixelPaint(x, y)

                BRESENHAM(x, y, lastX, lastY, pixelPaint)
                lastX = x;
                lastY = y;
            }

            document.onmouseup = () => {
                if (canvasRef?.current?.onmousemove) canvasRef.current.onmousemove = null;
            }
        }

        function bucketPaint(e) {
            const ctx = canvasRef?.current?.getContext("2d")
            const x = e.offsetX;
            const y = e.offsetY;
            const pixel = ctx.getImageData(x, y, 1, 1);
            const data = pixel.data;
            const pixelColor = data.join(', '); // .slice(0, -1)  deleted

            // in what color should to fill
            const rgb = color;
            const paintColor = rgb.join(', ') + ", 255"; //  +", 255"  added

            if (pixelColor !== paintColor) {
                const rgbaColor = {
                    r: +rgb[0],
                    g: +rgb[1],
                    b: +rgb[2],
                    a: +255
                };
                fillPixel(x, y, rgbaColor, data, { ctx, canvas: canvasRef.current });
            }
        }
        function pixelPaint(x, y) {
            const ctx = canvasRef?.current?.getContext("2d")
            ctx.fillStyle = colorToRGB(color);
            ctx.fillRect(canvasRes * Math.floor(x / canvasRes), canvasRes * Math.floor(y / canvasRes), canvasRes, canvasRes);
        }
    }, [canvasRef, tool, color, canvasRes]);

    function setBackgroundColor(colorValue) {
        previousColor.current.style.backgroundColor = currentColor.current.style.backgroundColor
        currentColor.current.style.backgroundColor = colorValue;
        setColor(arrayRgbFormat(colorValue))
    }

    const previousColor = useRef()
    const currentColor = useRef()

    const changeColor = () => {
        previousColor.current.style.backgroundColor = currentColor.current.style.backgroundColor
        currentColor.current.style.backgroundColor = toolColor;
        setColor(arrayRgbFormat(toolColor))
    }

    const clearCanvas = () => {
        const ctx = canvasRef?.current?.getContext("2d")
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    const [loading, setLoading] = useState(false)
    const sendCanvas = () => {
        setLoading(true)
        if (isCanvasBlank(canvasRef.current)) {
            message.error(`Ви не можете відправити порожній полотно`);
            setLoading(false)
        } else {
            canvasRef.current.toBlob((blob) => {
                sendCanvasImage(blob, () => {
                    setLoading(false)
                    closeModal()
                })
            });
        }
    }

    return (
        <Row className="pixel-paint">
            <Col className="tools">
                <Row className="tools__instruments">
                    <Col>
                        <Tooltip title="bucket">
                            <Button
                                loading={loading}
                                size="large"
                                type={tool === "bucket" ? "primary" : "dashed"}
                                shape="circle"
                                icon={<BgColorsOutlined />}
                                onClick={() => setTool("bucket")}
                            />
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip title="pencil">
                            <Button
                                loading={loading}
                                size="large"
                                type={tool === "pencil" ? "primary" : "dashed"}
                                shape="circle"
                                icon={<HighlightOutlined />}
                                onClick={() => setTool("pencil")}
                            />
                        </Tooltip>
                    </Col>


                </Row>
                <Row className="tools__colors">
                    <div className="tools__colors_item">
                        <div className="tools__colors_item-icon color-current" ref={currentColor} style={{ "backgroundColor": "rgb(196, 196, 196)" }}></div>
                        <span className="tools__colors_item-text">Поточний колір</span>
                    </div>
                    <div className="tools__colors_item" onClick={() => setBackgroundColor(previousColor.current.style.backgroundColor)}>
                        <div className="tools__colors_item-icon color-prev" ref={previousColor} style={{ "backgroundColor": "rgb(65, 247, 149)" }}></div>
                        <span className="tools__colors_item-text">Попередній колір</span>
                    </div>
                    <div className="separator"></div>
                    <div className="tools__colors_item" onClick={() => setBackgroundColor("rgb(247, 65, 65)")}>
                        <div className="tools__colors_item-icon color-red" style={{ "backgroundColor": "rgb(247, 65, 65)" }}></div>
                        <span className="tools__colors_item-text">Червоний</span>
                    </div>
                    <div className="tools__colors_item" onClick={() => setBackgroundColor("rgb(65, 182, 247)")}>
                        <div className="tools__colors_item-icon color-blue" style={{ "backgroundColor": "rgb(65, 182, 247)" }}></div>
                        <span className="tools__colors_item-text">Синій</span>
                    </div>
                </Row>
                <Row>
                    <slider-color-picker
                        ref={colorRef}
                        onChange={onColorChange}
                    />
                </Row>
                <Row className="color-picker">
                    <Col> <div className="color-picker--text">Натисніть щоб вибрати колір</div></Col>
                    <Col id="color-preview" onClick={changeColor} style={{ background: toolColor }}></Col>
                </Row>
            </Col>
            <Col>
                <canvas
                    ref={canvasRef}
                    id="canvas"
                    className={`canvas ${tool === "pencil" ? "pencil-cursor" : "bucket-cursor"}`}
                    width="512"
                    height="512">
                </canvas>
            </Col>
            <Col className="panel">
                <Row>
                    <div className="panel-section">
                        <div className="md-radio" >
                            <input id="1" type="radio" onChange={() => setCanvasRes(128)} name="g" checked={canvasRes === 128} />
                            <label htmlFor="1">4x4</label>
                        </div>
                        <div className="md-radio">
                            <input id="2" type="radio" onChange={() => setCanvasRes(32)} name="g" checked={canvasRes === 32} />
                            <label htmlFor="2">16x16</label>
                        </div>
                        <div className="md-radio">
                            <input id="3" type="radio" onChange={() => setCanvasRes(16)} name="g" checked={canvasRes === 16} />
                            <label htmlFor="3">32x32</label>
                        </div>
                    </div>
                </Row>
                <Row className="panel-btns">
                    <Col>
                        <Button loading={loading} onClick={clearCanvas} className="clear-canvas-btn" type="primary">ОЧИСТИТИ ПОЛОТНО</Button>
                    </Col>
                    <Col>
                        <Button loading={loading} onClick={sendCanvas} className="send-canvas-btn" type="primary">Надіслати</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => {
    return {}
};

const mapDispatchToProps = {};

const PixelPaintContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PixelPaint);

export { PixelPaintContainer };

