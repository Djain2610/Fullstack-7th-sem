# Todo List Application

A modern, responsive todo list application built with vanilla HTML, CSS, and JavaScript. Features a beautiful gradient design, smooth animations, and comprehensive functionality.

## Features

### Core Functionality
- ✅ **Add Tasks**: Create new todo items with a simple form
- ✅ **Mark Complete**: Toggle task completion with checkboxes
- ✅ **Edit Tasks**: In-place editing with keyboard shortcuts
- ✅ **Delete Tasks**: Remove individual tasks with confirmation
- ✅ **Filter Tasks**: View all, pending, or completed tasks
- ✅ **Clear Completed**: Bulk delete all completed tasks

### Advanced Features
- 💾 **Local Storage**: All data persists between browser sessions
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts**: 
  - Enter to add tasks
  - Enter to save edits
  - Escape to cancel editing
- 📊 **Task Statistics**: Real-time count of tasks by status
- 🎭 **Empty State**: Helpful message when no tasks exist
- 🔄 **Smooth Animations**: Slide-in effects and fade-out transitions

### User Experience
- **Intuitive Interface**: Clean, modern design that's easy to use
- **Visual Feedback**: Hover effects, transitions, and state indicators
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Sample Data**: Pre-loaded with helpful example tasks

## Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Start Adding Tasks** and organizing your work!

No installation or build process required - it's a pure client-side application.

## File Structure

```
project-6/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

## Usage

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click the + button
3. Your task appears at the top of the list

### Managing Tasks
- **Complete**: Click the checkbox next to any task
- **Edit**: Click the edit button (pencil icon) to modify text
- **Delete**: Click the delete button (trash icon) to remove a task

### Filtering Tasks
- **All**: View all tasks (default)
- **Pending**: Show only incomplete tasks
- **Completed**: Show only finished tasks

### Keyboard Shortcuts
- `Enter` in input field: Add new task
- `Enter` while editing: Save changes
- `Escape` while editing: Cancel changes

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern elements
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, classes, and modern APIs
- **Font Awesome**: Icons for better visual experience
- **Local Storage**: Browser API for data persistence

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Lightweight (~50KB total)
- No external dependencies (except Font Awesome CDN)
- Optimized animations using CSS transforms
- Efficient DOM manipulation

## Customization

The application is designed to be easily customizable:

### Colors
Modify the CSS custom properties in `styles.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --danger-color: #dc3545;
}
```

### Features
Add new functionality by extending the `TodoApp` class in `script.js`.

## License

This project is open source and available under the MIT License.

---

**Happy organizing!** 🎉
