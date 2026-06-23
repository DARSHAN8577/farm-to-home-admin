export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center border border-green-100">

                {/* Logo */}
                <img
                    src="/logo.png"
                    alt="Farm To Home"
                    className="w-28 h-28 mx-auto mb-4 rounded-full"
                />

                {/* Title */}
                <h1 className="text-3xl font-bold text-green-700 mb-2">
                    Farm To Home
                </h1>

                <p className="text-gray-600 mb-6">
                    Fresh milk delivered to your home daily.
                </p>

                {/* APK Download Button */}
                <a
                    href="https://farm-to-home-admin.vercel.app/apk/farm-to-home.apk"
                    download
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold inline-block transition"
                >
                    Download APK
                </a>

                {/* Version */}
                <p className="mt-4 text-sm text-gray-500">
                    Version 1.0.0
                </p>

                {/* Instructions */}
                <div className="mt-6 text-left bg-green-50 p-4 rounded-xl">
                    <h2 className="font-semibold text-green-700 mb-2">
                        Installation Steps:
                    </h2>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li>1. Click Download APK</li>
                        <li>2. Open downloaded file</li>
                        <li>3. Allow Install from Unknown Sources</li>
                        <li>4. Install the app</li>
                        <li>5. Login with your customer code</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}