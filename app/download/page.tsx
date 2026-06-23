export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-6">
            <div className="relative w-[320px] h-[650px] bg-white rounded-[40px] shadow-2xl border-[8px] border-black overflow-hidden">

                {/* Top notch */}
                <div className="w-32 h-6 bg-black rounded-b-2xl mx-auto"></div>

                <div className="p-6 text-center">

                    {/* Logo */}
                    <img
                        src="/logo.png"
                        alt="Farm To Home"
                        className="w-20 h-20 mx-auto mb-4"
                    />

                    {/* Heading */}
                    <h1 className="text-3xl font-bold text-black mb-2">
                        Fresh Daily Milk App
                    </h1>

                    <p className="text-sm text-gray-700 mb-5">
                        <b>Direct Download:</b> This app is shared directly for a limited
                        group of customers. Follow the steps below for safe installation.
                    </p>

                    {/* Download button */}
                    <a
                        href="/apk/farm-to-home.apk"
                        download
                        className="block bg-green-400 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-xl shadow-lg"
                    >
                        ⬇ DOWNLOAD APK (v1.0)
                    </a>

                    {/* Instructions */}
                    <div className="mt-6 bg-gray-100 rounded-xl p-4">
                        <h2 className="font-bold text-sm mb-4">
                            INSTALLATION INSTRUCTIONS (4 Easy Steps)
                        </h2>

                        <div className="grid grid-cols-2 gap-3 text-xs text-left">
                            <div className="bg-orange-50 p-2 rounded-lg">
                                Step 1: Tap "DOWNLOAD"
                            </div>

                            <div className="bg-gray-50 p-2 rounded-lg">
                                Step 2: Open settings and allow install
                            </div>

                            <div className="bg-green-50 p-2 rounded-lg">
                                Step 3: Enable permission
                            </div>

                            <div className="bg-blue-50 p-2 rounded-lg">
                                Step 4: Install and enjoy fresh milk!
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">
                        Powered by Farm To Home
                    </p>
                </div>
            </div>
        </div>
    );
}