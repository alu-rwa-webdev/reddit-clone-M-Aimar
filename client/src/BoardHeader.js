function BoardHeader() {
    return (
        <>
            <div className="h-20 bg-cover" style={{backgroundImage:'url("https://styles.redditmedia.com/t5_gty5d/styles/bannerBackgroundImage_b2ww9zpxsnl01.jpg?width=4000&format=pjpg&s=36f69780f30c0395b1c0808f3ecd56fd5fde17a7")'}}>
            </div>
            <div>
                <div className="mx-6 relative flex">
                    <div className="h-20 w-20 rounded-full overflow-hidden relative -top-3">
                        <img src="https://styles.redditmedia.com/t5_gty5d/styles/communityIcon_rjntde2iiox61.jpg?width=256&format=pjpg&s=809424e70f781e01ab88b2512ac9b9bc88e2c406" alt = "" />
                    </div>
                    <div className="pt-2 pl-4">
                        <h1 className="text-3xl">RedditClone: Summative Group work</h1>
                        <h5 className="text-gray-600">r/RedditClone</h5>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardHeader;