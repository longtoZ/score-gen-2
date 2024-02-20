export const track = () => {
    const userInfoData = JSON.stringify({
        'language': window.navigator.language,
        'userAgent': window.navigator.userAgent,
        'mobile': window.navigator.userAgentData.mobile,
        'screen': {
            'width': window.screen.width,
            'height': window.screen.height,
            'colorDepth': window.screen.colorDepth,
            'orientation': window.screen.orientation.type
        }
    })

    return userInfoData
}