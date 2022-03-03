import PreloaderStyle from './Preloader.module.css';

export default function Preloader() {
  return (
    <div className={`${PreloaderStyle['preloader__container']}`}>
      <div className={`${PreloaderStyle['preloader']}`}>
        <div className={`${PreloaderStyle['preloader__elem']} ${PreloaderStyle['preloader__elem_one']}`}></div>
        <div className={`${PreloaderStyle['preloader__elem']} ${PreloaderStyle['preloader__elem_two']}`}></div>
        <div className={`${PreloaderStyle['preloader__elem']} ${PreloaderStyle['preloader__elem_three']}`}></div>
      </div>
    </div>

  )
}
