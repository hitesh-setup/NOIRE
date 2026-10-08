<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep editable restaurant and menu content centralized in `src/data/restaurant.ts` so presentation never duplicates business data.
- Isolate React Three Fiber scenes in lazy-loaded browser-only modules, preserving photographic fallbacks and accessible DOM controls when WebGL is unavailable.
- Save guest reservations through validated TanStack server functions with private database tables; never expose guest details or privileged credentials to browsers.
- Define the visual system in `src/styles.css` and use dining Button variants for restaurant controls to maintain consistent theming.
