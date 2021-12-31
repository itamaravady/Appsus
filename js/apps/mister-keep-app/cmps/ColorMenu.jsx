export function ColorMenu(props) {
    const { setBgcColor } = props
    const colors = ['#ffffff', '#61e8e1', '#f25757', '#f2e863', '#f2cd60', '#adefa7']
    return (
        <div className={`color-picker`}>

            {colors.map((color, idx) => {
                // console.log(color);
                return <div onClick={() => setBgcColor(color)} className="btn-color-pick" style={{ backgroundColor: color }} key={idx}></div>
            }
            )}

        </div>
    )
}