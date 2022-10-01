import s from './MyGoals.module.scss';

const MyGoals = () =>{
    return(
    <>
    <div className={s.container}>
        <h1 className={s.title}>My Goals</h1>
        <div className={s.blockContainer}>
        <div className={s.block}>
            <p className={s.number}>0</p>
            <p className={s.desc}>Amount of books</p>
        </div>
        <div className={s.block}>
            <p className={s.number}>0</p>
            <p className={s.desc}>Amount of days</p>
        </div>
        </div>
    </div>
    </>)
}

export default MyGoals;