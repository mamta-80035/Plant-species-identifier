import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
			<div className="w-full py-8">
				<div className="max-w-2xl mx-auto px-4">
					<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6 space-y-4">
							<p>At Plant Species Identifier, we value your trust and respect your privacy. This Privacy Policy explains how we handle the information you share with us when using our service.</p>
							
							<p>When you upload or capture an image for plant identification, it is processed only for the purpose of recognizing the species. Images are not stored permanently; they are retained only for as long as necessary to complete the identification process. Once the process is finished, your images are automatically deleted from our system.</p>

							<p>We do not collect personal information such as your name, address, or contact details unless you voluntarily provide them through our Contact page. Your data is never sold, rented, or shared with third parties for advertising or commercial purposes.</p>

							<p>Our goal is to provide you with a safe and reliable experience. We use secure methods to process requests and ensure that your information is protected against unauthorized access. However, as with any online service, please be aware that no system can guarantee absolute security.</p>

							<p>Plant Species Identifier is intended for educational and informational use. By using this service, you agree to the collection and use of information strictly as outlined in this Privacy Policy.</p>

							<p>	If you have any questions or concerns about your privacy, please reach out to us through our Contact page. We are committed to addressing your queries and ensuring that you feel confident while using our platform.</p>
							
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 