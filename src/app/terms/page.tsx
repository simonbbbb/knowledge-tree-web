import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${SITE_NAME} terms of service.`,
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
          <p className="text-text-secondary/80">Last updated: April 2026</p>

          <h2 className="text-xl font-semibold text-text-primary">1. Acceptance</h2>
          <p>
            By using {SITE_NAME}, you agree to these terms. {SITE_NAME} is open-source
            software licensed under the Apache License 2.0.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">2. License</h2>
          <p>
            {SITE_NAME} is provided under the Apache License 2.0. You may use, modify,
            and distribute the software in accordance with the terms of that license.
            The full license text is available in the repository.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">3. Disclaimer</h2>
          <p>
            {SITE_NAME} IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">4. Use</h2>
          <p>
            You are responsible for ensuring that your use of {SITE_NAME} complies with
            your organization&apos;s policies and any applicable regulations. You are
            responsible for the security of your cloud provider credentials and any
            infrastructure data discovered by the tool.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">5. Contributions</h2>
          <p>
            Contributions to {SITE_NAME} are welcome and subject to the contribution
            guidelines in the repository. By contributing, you agree that your
            contributions will be licensed under the Apache License 2.0.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">6. Contact</h2>
          <p>
            For questions about these terms, please open an issue on our{" "}
            <a
              href="https://github.com/knowledge-tree/knowledge-tree"
              className="text-primary-400 hover:text-primary-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
