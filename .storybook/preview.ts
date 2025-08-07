import type { Preview } from '@storybook/angular'


const preview: Preview = {
  decorators: [
    (story) => {
      const storyObj = story();
      return {
        ...storyObj,
        template: `
          <div style="border: 1px solid red; display: inline-block; padding: 1px; border-radius: 1px;">
            ${storyObj.template}
          </div>
        `,
      };
    },
  ],
};

export default preview;
