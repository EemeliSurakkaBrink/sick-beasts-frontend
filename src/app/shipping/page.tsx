/**
 * Shipping and returns policy page with information about delivery and returns process
 */
import MainLayout from "@/components/layout/main-layout";

export default function ShippingPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-punk text-3xl md:text-4xl text-center mb-8">
          <span className="text-primary">SHIPPING</span> & RETURNS
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card p-8 rounded-lg mb-12">
            <h2 className="font-punk text-2xl mb-6">SHIPPING POLICY</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Processing Time</h3>
                <p className="text-muted-foreground">
                  Since all our t-shirts are printed on demand just for you, please allow 2-3 business days for your order to be processed and printed before shipping.
                </p>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Shipping Methods & Timeframes</h3>
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <h4 className="font-semibold">Standard Shipping</h4>
                    <p className="text-muted-foreground">3-5 business days after production (domestic)</p>
                    <p className="text-muted-foreground">$5.99 for orders under $75</p>
                    <p className="text-muted-foreground">FREE for orders over $75</p>
                  </div>
                  
                  <div className="border-b border-border pb-4">
                    <h4 className="font-semibold">Express Shipping</h4>
                    <p className="text-muted-foreground">2-3 business days after production (domestic)</p>
                    <p className="text-muted-foreground">$12.99 for all orders</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">International Shipping</h4>
                    <p className="text-muted-foreground">7-14 business days after production</p>
                    <p className="text-muted-foreground">Starting at $15.99 (calculated at checkout based on destination and weight)</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Tracking Information</h3>
                <p className="text-muted-foreground">
                  You will receive a shipping confirmation email with tracking information once your order has shipped. You can also track your order by logging into your account or contacting our customer service team.
                </p>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Customs & Import Duties</h3>
                <p className="text-muted-foreground">
                  For international orders, please note that customers are responsible for any customs fees, import duties, or taxes that may be imposed by your country&apos;s customs authorities. These charges are not included in the purchase price or shipping costs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg">
            <h2 className="font-punk text-2xl mb-6">RETURNS & EXCHANGES</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Return Policy</h3>
                <p className="text-muted-foreground">
                  We want you to be completely satisfied with your purchase. If for any reason you&apos;re not, we accept returns within 30 days of delivery for unworn items in original condition with tags attached.
                </p>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Return Eligibility</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Items must be unworn, unwashed, and in original condition with all tags attached</li>
                  <li>Items must be returned within 30 days of delivery</li>
                  <li>Due to the custom nature of our products, we can only accept returns for size issues or manufacturing defects</li>
                  <li>Sale items and customized designs are final sale and cannot be returned unless defective</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">How to Return</h3>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>Contact our customer service team at returns@sickbeasts.com to initiate your return and receive a Return Merchandise Authorization (RMA) number</li>
                  <li>Package your item(s) securely with the original packaging if possible</li>
                  <li>Include your order number and RMA number with your return</li>
                  <li>Ship your return to the address provided in the return confirmation email</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Refunds</h3>
                <p className="text-muted-foreground">
                  Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. If approved, your refund will be processed and a credit will automatically be applied to your original method of payment within 5-7 business days.
                </p>
                <p className="text-muted-foreground mt-2">
                  Please note that original shipping charges are non-refundable, and you will be responsible for the cost of return shipping.
                </p>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Exchanges</h3>
                <p className="text-muted-foreground">
                  We don&apos;t offer direct exchanges at this time. If you need a different size or color, please return your item for a refund and place a new order for the desired item.
                </p>
              </div>
              
              <div>
                <h3 className="font-punk text-lg text-primary mb-2">Defective Items</h3>
                <p className="text-muted-foreground">
                  If you receive a defective item, please contact our customer service team within 7 days of receipt. We may request photos of the defect before authorizing a return. Defective items will be replaced or refunded at our discretion, and we will cover the cost of return shipping for defective items.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h3 className="font-punk text-xl mb-4">Need further assistance?</h3>
            <a 
              href="/contact" 
              className="inline-block bg-primary hover:bg-primary/90 text-white font-punk py-2 px-6 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 