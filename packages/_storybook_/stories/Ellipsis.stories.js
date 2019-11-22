import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import Ellipsis from "@reciprocity/ellipsis";
import README from "../../ellipsis/README.md";

storiesOf("Ellipsis", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    components: { Ellipsis },
    template: `<div style="width: 500px; background: #f5f5f5;">
                <ellipsis>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc 
                    eleifend lorem massa, id porta mi efficitur vitae. Nunc 
                    vestibulum nibh sed molestie placerat. Ut euismod sem eget 
                    aliquet vehicula. Suspendisse volutpat tortor at pharetra eleifend. 
                    Mauris at maximus nulla. Suspendisse sagittis porttitor pulvinar. 
                    Mauris eu pulvinar dui. Aenean tempus rutrum augue, ac efficitur 
                    justo congue vel. Sed viverra fringilla dolor, non laoreet ligula 
                    congue eu. Praesent vehicula odio id hendrerit vehicula. 
                    
                    Nullam nulla ex, ornare ac lacinia et, porttitor at augue. 
                    Suspendisse aliquet nibh aliquet, dignissim neque sed, luctus ligula.
                  </p>
                </ellipsis>
              </div>`,
    methods: { action: action("input") }
  }));
