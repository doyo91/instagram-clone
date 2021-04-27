export default function AppStore() {
  return (
    <div className="flex justify-center items-center flex-col w-full py-4">
      <p className="text-sm">Descarga la aplicación.</p>
      <div className="flex justify-center p-2 my-2">
        <a
          href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.signupPage.badge&mt=8&vt=lo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-32 mr-1"
            src="/images/apple-store.png"
            alt="Apple Store"
          />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3D87B248B8-571B-4137-B53F-DDFCDA64B0E5%26utm_content%3Dlo%26utm_medium%3Dbadge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-32 ml-1"
            src="/images/google-play.png"
            alt="Google Store"
          />
        </a>
      </div>
    </div>
  )
}
