export function LongTxt({ description, isLongTxtShown, onShowMore }) {
    description = isLongTxtShown ? description : description.substring(0, 100) + '...'
    const BtnTxt = isLongTxtShown ? 'less' : 'more';
    return (

        <p>
            {description}
            <button onClick={onShowMore}>{BtnTxt}</button>
        </p>
    )
}