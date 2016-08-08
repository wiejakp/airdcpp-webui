import React from 'react';

import LocalSuggestField from 'components/autosuggest/LocalSuggestField';

import t from 'utils/tcomb-form';

import 'components/autosuggest/style.css';


const shouldRenderSuggestions = (locals, value) => {
	if (value.length === 0) {
		return locals.config.alwaysList ? true : false;
	}

	return true;
};

const AutoSuggestField = t.form.Form.templates.textbox.clone({
	renderInput(locals) {
		return (
			<div className="ui fluid input">
				<LocalSuggestField 
					placeholder={ locals.attrs.placeholder }
					data={ locals.config.suggestionGetter() }
					onChange={ locals.onChange }
					storedValue={ locals.value ? locals.value : '' }
					shouldRenderSuggestions={ shouldRenderSuggestions.bind(this, locals) }
				/>
			</div>
		);
	}
});

export default AutoSuggestField;